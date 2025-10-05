import { ZodError } from "zod";

export async function formatError(error: any) {
  if (error instanceof ZodError) {
    const fieldErrors = error.issues.map((issue: any) => issue.message);

    return fieldErrors.join(", ");
  } else if (error.name === "PrismaClientKnownRequestError" && error.code === "P2002") {
    return "A record with this information already exists";
  } else {
    return error.message || "An unexpected error occurred";
  }
}

export async function loginFormatError(error: any) {
  if (error instanceof ZodError) {
    return error.issues.map((issue: any) => issue.message).join(", ");
  } else {
    return error.message || "An unexpected error occurred";
  }
}