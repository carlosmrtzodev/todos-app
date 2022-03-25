const Container = ({ children }) => {
  return (
    <main className="app">
      <article className="app__container">
        <section className="app__container-section">{children}</section>
      </article>
    </main>
  );
};
export default Container;
