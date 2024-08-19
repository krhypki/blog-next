import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

export default function MissingProfileInfo() {
  return (
    <Alert variant="destructive">
      <AlertDescription>
        Please fill <b>first name</b> and <b>last name</b> in your{" "}
        <Link href="/dashboard/account" className="text-blue-800 font-semibold">
          profile information
        </Link>{" "}
        before adding a new post.
      </AlertDescription>
    </Alert>
  );
}
