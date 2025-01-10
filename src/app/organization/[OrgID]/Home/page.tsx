function OrgHome({params}:{params :{ OrgID : string}}) {
  return (
    <div>
      <h1>Organisation Home {params.OrgID}</h1>
    </div>
  )
}

export default OrgHome
