<div className=" content-card">
  <div className="container diveCard p-3 shadow" key={c._id}>
    <div className="row">
      <div className="col">

        <h3>{c.title} <Rating className="">{c.rating}</Rating></h3>

      </div>

      <div class="col">
        <h3 className=" text-right">
          {(!c.favourite)
            ? <div><span><i onClick={() => this.favouriteDive(c._id)} className="heart outline icon" /></span></div>
            : <div><span>
              <i onClick={() => this.favouriteDive(c._id)} className="heart icon" /></span></div>}

          <a onClick={() => this.deleteDive(c
            ._id)}><i class="trash alternate outline icon"></i>
          </a></h3>
      </div>
    </div>

    <div className="row align-items-center">
      <div className="col-sm-8">
        <div>
          <div className="text-card pt-5 ">
            <span>Date: {c.date}</span><br />
            <span>Type of dive: {c.diveType}</span><br />
            <span><strong>Visibility: </strong>{c.visibility}m</span><br />
            <span><strong>Depth: </strong>{c.depth}m</span></div>
          <div><span>Description:</span>
            <p>{c.description}</p>
          </div>
          <Button href={`/dive/${c._id}`}>View</Button>
        </div>
      </div>

      <div className="col-sm-4">
        <div className="p-3"><Map
          location={c.location}
          id={c._id}
          allowMovement={false}
          accessToken="pk.eyJ1IjoibGF1cmFwcjIiLCJhIjoiY2pydDhkNDVrMHFheTN5bXFsZnY0azNnMiJ9.07FzAj0enFs4Z4GP0chyvA" /></div>
      </div>
    </div>
  </div>
</div>