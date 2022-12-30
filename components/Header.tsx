import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            src="data:image/png;base64,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"
            alt="Brand logo"
            className="w-44 object-contain cursor-pointers"
          />
        </Link>
        <div className="hidden md:inline-flex items-center space-x-5">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="text-white bg-green-600 px-4 py-1 rounded-full">
            Follow
          </h3>
        </div>
      </div>

      <div className="flex items-center space-x-5 text-green-600 ">
        <h3>Sign In</h3>
        <h3 className="border px-4 py-1 rounded-full border-green-600">
          Get Started
        </h3>
      </div>
    </header>
  );
};

export default Header;
