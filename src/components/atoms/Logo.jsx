import { Link } from "react-router-dom";

export default function Logo({ href, src, name = "logo" }) {
  return (
    <Link href={href} class="flex items-center">
      {/*<img src={ src } class="h-8 mr-3" alt="Flowbite Logo" /> */}
      <span class="self-center text-2xl font-semibold whitespace-nowrap text-primary dark:text-white">
        {name}
      </span>
    </Link>
  );
}
