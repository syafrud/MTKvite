export default function PageComponent({ title, buttons = "", children }) {
  return (
    <>
      <main>
        <div className="mx-auto max-w-max  py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </>
  );
}
