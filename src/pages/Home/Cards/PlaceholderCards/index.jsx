import { Card, Placeholder } from "react-bootstrap";

function PlaceholderCards() {
  return (
    <div className="card-container-placeholder col-sm-6 col-md-4 col-mdlg-4th col-lg-5th">
      <Card className="card-placeholder h-100 p-0 border-0">
        <Placeholder as="div" animation="glow" className="card-img rounded-4">
          <Placeholder xs={12} className="card-img-background rounded-4" />
        </Placeholder>
        <Card.Body className="d-flex flex-column p-0 my-2">
          <div className="d-flex align-items-center justify-content-between">
            <Placeholder as={Card.Title} animation="glow" className="w-75">
              <Placeholder xs={6} />
            </Placeholder>
            <div className="card-rating d-flex align-items-center gap-1">
              <Placeholder as="div" animation="glow">
                <Placeholder
                  xs={3}
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    borderRadius: "50%",
                    backgroundColor: "#e0e0e0",
                  }}
                />
              </Placeholder>
            </div>
          </div>
          <Placeholder as={Card.Text} animation="glow" className="text-muted">
            <Placeholder xs={7} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={4} /> <Placeholder xs={4} />
          </Placeholder>
          <div className="mt-auto d-flex align-items-center">
            <Placeholder as={Card.Text} animation="glow" className="me-2">
              <Placeholder xs={3} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={2} />
            </Placeholder>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
export default PlaceholderCards;
