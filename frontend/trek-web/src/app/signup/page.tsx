import { Metadata } from 'next';
import MultiStepSignUp from '../ui/sign-up/multistep-signup';

export const metadata: Metadata = {
  title: 'Sign Up',
};
 
export default function SignupPage() {
  //const [role, setRole] = useState(1)

  return (
    <main className="flex-1 flex flex-col md:items-center md:h-screen md:mt-10 mb-10 md:mb-0">
      <MultiStepSignUp />
    </main>
  );
}

