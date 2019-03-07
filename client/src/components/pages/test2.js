{/* <div className="tContainer diveCard shadow w-75" key={c._id}>
  <div className="row">
    <div className="tContainerTitle col d-flex">
      <div className="ttitle">
        <h3>{c.title} </h3>
      </div>

      <div className="tstars col">
        <Rating className="">{c.rating}</Rating>
      </div>
    </div>

    <div className="ticons align-items-flex-end col d-flex">
      {(!c.favourite)
        ? <div><span><i onClick={() => this.favouriteDive(c._id)} className="heart outline icon" /></span></div>
        : <div><span>
          <i onClick={() => this.favouriteDive(c._id)} className="heart icon" /></span></div>}

      <a onClick={() => this.deleteDive(c
        ._id)}><i class="trash alternate outline icon"></i>
      </a>
    </div>

  </div>
  <div className="row">
    <div className="tContainerRest col">
      <div className="tInfo">
        <span>Date: {c.date}</span><br />
        <span>Type of dive: {c.diveType}</span><br />
        <span><strong>Visibility: </strong>{c.visibility}m</span><br />
        <span><strong>Depth: </strong>{c.depth}m</span>
      </div>
      <div className="tDescription">
      </div>
      <div className="tButton">
        <Button href={`/dive/${c._id}`}>View</Button>
      </div>
    </div>

    <div className="tMap col">
      <Map
        location={c.location}
        id={c._id}
        allowMovement={false}
        accessToken="pk.eyJ1IjoibGF1cmFwcjIiLCJhIjoiY2pydDhkNDVrMHFheTN5bXFsZnY0azNnMiJ9.07FzAj0enFs4Z4GP0chyvA" />
    </div>
  </div>

</div>

            /* Ending here */



          )
        }
        )}</div >
      </div >
    )
  }
componentDidMount() {
  api.getDives()
    .then(dives => {
      this.setState({
        dives: dives
      })
    })
    .catch(err => console.log(err))
}
} */}
