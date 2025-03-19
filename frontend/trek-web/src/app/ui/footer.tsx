import Link from "next/link"
import TrekLogo from "./logo/trek-logo";

export default function Footer() {
    const footerLinkStyle = "text-sm hover:underline"
    const footerSectionStyle = 'flex flex-col gap-1 md:mx-8 md:my-0 my-5'

    return(
        <footer className="flex flex-col bg-neutral-200 dark:bg-neutral-800 p-8 text-sm">
        <div className="md:flex md:flex-row justify-between">
          <div className="max-w-md">
            <div className="flex row gap-2 mb-5">
                <TrekLogo size={28} color="fill-neutral-900 dark:fill-neutral-100" />
                <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Trek</p>
            </div>
            <p>This is some text that will explain what the platform is blablabla some more text
              is here so. This is some text that will explain what the platform is blablabla some more text
              is here so.
            </p>
          </div>
          <div className="md:flex md:flex-row md:gap-10 mt-10 md:mt-0">
            <div className={footerSectionStyle}>
              <h3 className="font-bold">Title</h3>
              <Link href="/privacy-policy" className={footerLinkStyle}>Privacy Policy</Link>
              <Link href="/terms-of-service" className={footerLinkStyle}>Terms of Service</Link>
            </div>
            <div className={footerSectionStyle}>
              <h3 className="font-bold">Title</h3>
              <Link href="/privacy-policy" className={footerLinkStyle}>Privacy Policy</Link>
              <Link href="/terms-of-service" className={footerLinkStyle}>Terms of Service</Link>
            </div>
            <div className={footerSectionStyle}>
              <h3 className="font-bold">Title</h3>
              <Link href="/privacy-policy" className={footerLinkStyle}>Privacy Policy</Link>
              <Link href="/terms-of-service" className={footerLinkStyle}>Terms of Service</Link>
            </div>
          </div>
        </div>
        <hr className="mt-10 mb-3 border-neutral-400 dark:border-neutral-600 border-t-2"></hr>
        <p className="text-sm">Copyright and other bs</p>
      </footer>
    );

}