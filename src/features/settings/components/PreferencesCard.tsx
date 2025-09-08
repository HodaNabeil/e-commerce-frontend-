"use client";

import { Bell, Globe } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function PreferencesCard() {
  const [notifications, setNotifications] = useState(true);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Preferences
        </CardTitle>
        <CardDescription>
          Customize your app experience and notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
          <div className="flex-1 mb-3 sm:mb-0">
            <h3 className="font-medium text-gray-900">Notifications</h3>
            <p className="text-sm text-gray-500">
              Receive notifications about orders and offers
            </p>
          </div>
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3 mb-3 sm:mb-0">
            <Globe className="w-5 h-5 text-gray-500" />
            <div>
              <h3 className="font-medium text-gray-900">Language</h3>
              <p className="text-sm text-gray-500">English</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="cursor-pointer">
            Change
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
