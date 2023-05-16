export function Footer() {
  const footerItens = ['Terms', 'Sitemap', 'Privacy', 'Your Privacy Choices']
  return (
    <div className="w-full hidden md:flex py-5 px-20 bg-white border border-t-1 border-rose-300 fixed bottom-0 flex-row justify-between">
      <div className="flex flex-row gap-2">
        © 2023 Airbnb, Inc.{' '}
        {footerItens.map((item) => {
          return (
            <div key={item} className="cursor-pointer hover:underline ">
              · {item} ·
            </div>
          )
        })}
      </div>
      <div>English (US) - Choose a currency - $ USD - Support & resources </div>
    </div>
  )
}
