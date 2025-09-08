"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdditionalSettingsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Settings</CardTitle>
        <CardDescription>Other account and privacy settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900">Privacy</h3>
            <p className="text-sm text-gray-500">
              Manage your privacy settings and data
            </p>
          </div>
          <Button variant="outline" size="sm" className="cursor-pointer">
            Manage
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900">Data Export</h3>
            <p className="text-sm text-gray-500">Download your account data</p>
          </div>
          <Button variant="outline" size="sm" className="cursor-pointer">
            Export
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
