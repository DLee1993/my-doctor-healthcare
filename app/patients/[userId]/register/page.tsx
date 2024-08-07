import Image from "next/image";
import Link from "next/link";
import PatientForm from "@/components/forms/PatientForm";
import { getUser } from "@/lib/actions/patient.actions";

const Register = async ({ params: { userId } }: SearchParamProps) => {
    const user = await getUser(userId);

    return (
        <section className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container my-auto">
                <aside className="sub-container">
                    <figure className="flex gap-2">
                        <Image
                            src="/assets/icons/logo-icon.svg"
                            alt="patient"
                            width={1000}
                            height={1000}
                            className="h-6 w-fit mb-8"
                        />
                        <figcaption className="font-bold">MyDoctor</figcaption>
                    </figure>

                    <section className="space-y-4 mb-10">
                        <h1 className="header">Welcome 👋</h1>
                        <p className="text-dark-700 text-sm">Let us know more about yourself.</p>
                    </section>

                    <PatientForm user={user} />

                    <div className="text-14-regular py-8 flex justify-between">
                        <p className="copyright">© 2024 MyDoctor</p>
                    </div>
                </aside>
            </section>
            <figure className="max-w-[40%]">
                <Image
                    src="/assets/images/register-img.png"
                    alt="patient"
                    width={1000}
                    height={1000}
                    className="side-img h-full"
                />
            </figure>
        </section>
    );
};
export default Register;
