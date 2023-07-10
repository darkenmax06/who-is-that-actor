import Card from "./Card"

function Anexos  ({anexos}) {
  return (
    <section className="anexos">
      {
        anexos?.map((anexo) => 
        <Card 
        key={anexo.id}
        name={anexo.name}
        imgUri={anexo.imgUri}
         /> )
      }
    </section>
  )
}

export default Anexos