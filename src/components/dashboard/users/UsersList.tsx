"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDate } from "@/lib/utils/datetime";
import Link from "next/link";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { useSortItems } from "@/hooks/useSortItems";
import { User } from "@/lib/types/database";

type UsersListProps = {
  users: User[];
};

const columns: { key: keyof User; label: string }[] = [
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "created_at", label: "Created At" },
];

export default function UsersList({ users }: UsersListProps) {
  const {
    items: sortedUsers,
    sortedBy,
    sortDirection,
    sortItems,
  } = useSortItems<User>(users, "email");

  if (!users.length) {
    return <p className="text center my-6">No users found</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map(({ key, label }) => (
            <TableHead
              key={key}
              onClick={() => sortItems(key)}
              className={`cursor-pointer ${sortedBy === key && "bg-slate-100"}`}
            >
              <div className="flex items-center gap-x-1">
                {sortedBy === key &&
                  (sortDirection === "asc" ? (
                    <FaSortAlphaUp />
                  ) : (
                    <FaSortAlphaDown />
                  ))}
                {label}
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedUsers.map((user) => (
          <TableRow key={user.id} className="relative">
            <TableCell>
              <Link
                href={`/dashboard/users/${user.id}`}
                className="absolute top-0 right-0 bottom-0 left-0"
              />
              {user.email}
            </TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{getDate(user.created_at)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
