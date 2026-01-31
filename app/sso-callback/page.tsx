import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';

export default function SSOCallback() {
    return (
        <div className="min-h-screen bg-[#060010] flex items-center justify-center">
            <AuthenticateWithRedirectCallback
                signUpForceRedirectUrl="/dashboard"
                signInForceRedirectUrl="/dashboard"
            />
        </div>
    );
}
