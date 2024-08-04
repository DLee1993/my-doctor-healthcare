import Image from "next/image";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";

export default function Home() {
    return (
        <section className="flex h-screen max-h-screen">
            {/* TODO: OTP | Passkey Verification modal */}
            <section className="remove-scrollbar container my-auto">
                <aside className="sub-container max-w-[496px]">
                    <figure>
                        <Image
                            src="/assets/icons/logo-full.svg"
                            alt="patient"
                            width={1000}
                            height={1000}
                            className="h-10 w-fit"
                        />
                    </figure>
                    <PatientForm />
                    <div className="text-14-regular flex justify-between">
                        <p>© 2024 MyDoctor</p>
                        <Link href="/?admin=true" className="underline text-green-500">
                            Admin Login
                        </Link>
                    </div>
                </aside>
            </section>
            <figure className="max-w-[50%]">
                <Image
                    src="/assets/images/onboarding-img.png"
                    alt="patient"
                    width={1000}
                    height={1000}
                    className="side-img h-full"
                />
            </figure>
        </section>
    );
}
