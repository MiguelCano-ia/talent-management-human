import { RegisterForm } from "@/features/auth/components/RegiserForm";

export default function Page() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-10">
      <RegisterForm />
    </main>
  );
}