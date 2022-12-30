const Hero = () => {
  return (
    <section className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
      <div className="px-10 space-y-5">
        <h1 className="text-6xl max-w-xl font-serif">
          <span className="underline decoration-black decoration-4">
            Medium
          </span>{" "}
          is a place to write, read, and connect
        </h1>
        <h2>
          It's easy and free to post your thinking on any topic and connect with
          millions of readers
        </h2>
      </div>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYbYDM7-YCl2gnOwpNWNy4TDMY5Z_si3vBilsFWN7UcaG054YtSRNcuM61xmc2TtDj7Ys&usqp=CAU"
        alt=""
        className="hidden md:inline-flex h-32 lg:h-80"
      />
    </section>
  );
};

export default Hero;
