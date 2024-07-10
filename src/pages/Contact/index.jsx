const Contact = () => {
  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact sales</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>
      <form action="#" method="POST" className="mx-auto mt-8 max-w-xl sm:mt-8">
        <div className="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2">
          <div>
            <div className="mt-2.5">
              <input
                id="first-name"
                name="first-name"
                type="text"
                placeholder="First name"
                autoComplete="given-name"
                className="w-full rounded-md border border-gray-300 p-4 mb-2"
              />
            </div>
          </div>
          <div>
            <div className="mt-2.5">
              <input
                id="last-name"
                name="last-name"
                type="text"
                placeholder="Last name"
                autoComplete="family-name"
                className="w-full rounded-md border border-gray-300 p-4 mb-2"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="mt-2.5">
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Company"
                autoComplete="organization"
                className="w-full rounded-md border border-gray-300 p-4 mb-2"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                className="w-full rounded-md border border-gray-300 p-4 mb-2"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Message"
                className="w-full rounded-md border border-gray-300 p-4 resize-none"
                defaultValue={''}
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="block w-full rounded-md bg-black hover:bg-gray-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )


}

export default Contact