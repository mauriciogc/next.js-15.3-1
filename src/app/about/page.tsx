export default function AboutUs() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-stone-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center p-3">
        <div>
          <p className="text-sm text-gray-500 mb-2">Sobre nosotros</p>
          <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            Lorem ipsum dolor sit amet
          </h2>
          <p className="text-gray-600 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
            minima temporibus, consequuntur eius incidunt ullam, sapiente
            nesciunt eum quod eaque quia aspernatur quasi a harum mollitia
            adipisci ut recusandae provident?
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-1 border-t border-pink-500 pt-3">
                50+ elit
              </h3>
              <p className="text-sm text-gray-600">
                consectetur adipisicing elit
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-1 border-t border-pink-500 pt-3">
                100+ consectetur
              </h3>
              <p className="text-sm text-gray-600">
                nesciunt eum quod eaque quia aspernatur
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-1 border-t border-pink-500 pt-3">
                20+ aspernatur
              </h3>
              <p className="text-sm text-gray-600">quasi a harum mollitia</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-1 border-t border-pink-500 pt-3">
                99% adipisci
              </h3>
              <p className="text-sm text-gray-600">
                eum quod eaque quia aspernatur
              </p>
            </div>
          </div>
        </div>

        <div className=" bg-stone-300 p-6 flex flex-col justify-between h-full"></div>
      </div>
    </section>
  );
}
