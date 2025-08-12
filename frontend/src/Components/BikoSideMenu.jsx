
function BikoSideMenu() {
  return (
    <>
    {window.outerWidth < window.screen.width ?
     <div className="Biko-side-menu-expanded"></div> : null}
    </>
  );
}
export default BikoSideMenu;