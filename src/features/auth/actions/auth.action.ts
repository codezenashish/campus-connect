"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { db, users } from "@/db";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;
  const name =
    (formData.get("name") as string)?.trim() ||
    (email ? email.split("@")[0] : "Student");

  if (!email || !password) {
    return { error: "Please fill in all required fields." };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Supabase returns an empty identities array if user with this email already exists
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return { error: "An account with this email already exists. Please log in." };
  }

  if (data.user) {
    try {
      await db
        .insert(users)
        .values({
          id: data.user.id,
          name: name,
          email: email,
          role: "student",
        })
        .onConflictDoNothing();
    } catch (dbError: unknown) {
      console.error(
        "Drizzle sync error:",
        dbError instanceof Error ? dbError.message : "Unknown database error"
      );
    }
  }

  // If email confirmation is enabled in Supabase, session is null until verified
  if (!data.session) {
    return {
      requiresConfirmation: true,
      message:
        "Account created! Please check your email to confirm your account before logging in, or disable 'Confirm email' in Supabase Auth settings.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/home");
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please enter both email and password." };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.toLowerCase().includes("invalid login credentials")) {
      return {
        error:
          "Invalid login credentials. Agar aapne abhi signup kiya hai to apna email inbox check karke email confirm karein, ya email/password check karein.",
      };
    }
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/home");
}

