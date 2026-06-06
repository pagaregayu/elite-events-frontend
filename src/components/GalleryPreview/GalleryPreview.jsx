import "./GalleryPreview.css";

function GalleryPreview() {
  return (

    <section className="gallery-preview">

      <div className="container">

        <h2 className="section-title">
          Event Gallery
        </h2>

        <div className="gallery-grid">

          <img src="https://images.unsplash.com/photo-1519741497674-611481863552" />
          <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3" />
          <img src="https://images.unsplash.com/photo-1520854221256-17451cc331bf" />
          <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed" />

        </div>

      </div>

    </section>
  );
}

export default GalleryPreview;