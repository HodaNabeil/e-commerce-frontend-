"use client";

import Header from "@/features/settings/components/Header";
import ProfileCard from "@/features/settings/components/ProfileCard";
import AccountSettingsCard from "@/features/settings/components/AccountSettingsCard";
import PreferencesCard from "@/features/settings/components/PreferencesCard";
import AdditionalSettingsCard from "@/features/settings/components/AdditionalSettingsCard";
import { useAuth } from "@/features/auth/hooks/useAuthStore";
import Loader from "@/components/shared/Loader";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="">
      {/* Header */}
      <Header />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {user ? (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {/* Profile Section */}
            <div className="lg:col-span-2">
              <ProfileCard user={user} />
            </div>

            {/* Account Settings */}
            <AccountSettingsCard user={user} />

            {/* Preferences */}
            <PreferencesCard />

            {/* Additional Settings */}
            <AdditionalSettingsCard />
          </div>
        ) : (
          <div className="text-center py-8">
            <Loader
              className="flex justify-center items-center  m-auto"
              size={56}
              ariaLabel="Settings"
            />
          </div>
        )}
      </div>
    </div>
  );
}
