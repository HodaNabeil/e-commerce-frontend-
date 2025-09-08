"use client";

import { User as UserIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User as FirebaseUser } from "firebase/auth";

type ProfileCardProps = {
  user: FirebaseUser;
};

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="w-5 h-5" />
          Profile
        </CardTitle>
        <CardDescription>
          Manage your profile information and account details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="text-lg bg-blue-500 text-white">
              {user.displayName?.[0] || user.email?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">
              {user.displayName || user.email?.split("@")[0] || "User"}
            </h3>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
