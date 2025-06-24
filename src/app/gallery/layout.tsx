export default function FeedLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="">
      <h1 className="title">Gallery</h1>
      {children}
      {modal}
      <div id="modal-root" />
    </div>
  );
}
