import { ZodError } from "zod";

export async function formatError(error: any) {
  console.error('Error from formatError', error.name)
  console.error('Error errors errors1:::: ', Object.keys(error))
  console.error('Error errors errors2::::: ', error.errors)
  console.error('Error errors errors3::::: ', error.issues)
  if (error instanceof ZodError) {
    const fieldErrors = error.issues.map((issue: any) => issue.message);

    return fieldErrors.join(", ");
  } else if (error.name === "PrismaClientKnownRequestError" && error.code === "P2002") {
    return "A record with this information already exists";
  } else {
    return error.message || "An unexpected error occurred";
  }
}