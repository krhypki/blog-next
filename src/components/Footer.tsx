import { GITHUB_REPO_URL } from "@/lib/constants";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import Container from "./general/Container";
import { getCurrentYear } from "@/lib/utils/datetime";

export default function Footer() {
  return (
    <footer className="mt-auto py-2 border-t">
      <Container className="flex justify-between py-3">
        <small>Blog Demo App {getCurrentYear()}. All rights reserved</small>

        <Link
          className="flex items-center gap-x-2 font-semibold"
          href={GITHUB_REPO_URL}
        >
          Github
          <BsGithub className="h-6 w-6" />
        </Link>
      </Container>
    </footer>
  );
}
