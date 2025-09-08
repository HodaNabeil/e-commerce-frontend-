"use client";

import { Mail, Shield } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User as FirebaseUser } from "firebase/auth";

type AccountSettingsCardProps = {
  user: FirebaseUser;
  onChangeEmail?: () => void;
  onChangePassword?: () => void;
};

export default function AccountSettingsCard({
  user,
  onChangeEmail,
  onChangePassword,
}: AccountSettingsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Account Settings
        </CardTitle>
        <CardDescription>
          Manage your account security and preferences
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Email Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border rounded-lg">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Mail className="w-5 h-5 text-gray-500 shrink-0" />
            <div className="min-w-0">
              <h3 className="font-medium text-gray-900 truncate">
                Email Address
              </h3>
              <p className="text-sm text-gray-500 break-words">{user.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="self-start sm:self-auto"
            onClick={onChangeEmail}
          >
            Change
          </Button>
        </div>

        {/* Password Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border rounded-lg">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Shield className="w-5 h-5 text-gray-500 shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900">Password</h3>
              <p className="text-sm text-gray-500">Change your password</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="self-start sm:self-auto"
            onClick={onChangePassword}
          >
            Change
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
