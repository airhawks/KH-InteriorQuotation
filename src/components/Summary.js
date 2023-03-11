import logoImage from "../assets/logo.png";

function VR() {
  return (
    <div className="col-auto gx-0">
      <div
        className="vr"
        style={{
          height: "100%",
          width: "1px",
        }}
      ></div>
    </div>
  );
}

function Divider() {
  return (
    <hr
      style={{
        margin: 0,
      }}
    />
  );
}

const COLS = ["Sr. No.", "Description", "Quantity", "Unit", "Rate", "Amount"];

const COLS_SIZES = {
  "Sr. No.": 0.7,
  Description: 4,
  Image: 1.5,
  Unit: 1,
  Quantity: 0.5,
  Rate: 0.5,
  Amount: 0.5,
};

const to2DecimalPlaces = (numberOrString) => {
  const numberFormatter = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  return numberFormatter.format(numberOrString);
};

export default function Summary({ quotationDate = new Date() }) {
  const localDataString = window.localStorage.getItem("KH_data");
  const data = JSON.parse(localDataString || "[]");

  const localClientDataString = window.localStorage.getItem("KH_ClientDetails");
  const clientData = JSON.parse(localClientDataString || "{}");

  const grossAmount = data.reduce((sum, row) => {
    return sum + (row.rate || 0) * (row.quantity || 0);
  }, 0);

  return (
    <div className="main-container">
      <div className="container-fluid black-border-container">
        <div className="row">
          <div className="col-4 ">
            <div className="d-flex align-items-center justify-content-center flex-column h-100">
              <img src={logoImage} className="w-100" alt="" />
            </div>
          </div>
          <VR />
          <div className="col">
            <strong className="text-center">
              <p className="h4 fw-semibold">
                Proposed estimate for the interior work
              </p>
              <p
                className="h2 fw-bold"
                style={{
                  backgroundColor: "#f9a927",
                  color: "#058492",
                }}
              >
                KAUSHAL HOMES
              </p>
              <p className="h6">SCO-16, 1st Floor, Pocket-B Near HDFC Bank</p>
              <p className="h6">Sec-14, Hisar Haryana - 125001 </p>{" "}
              <p className="h6">
                <a href="mailto:sumit@kaushalhomes.com">
                  sumit@kaushalhomes.com
                </a>
                ,{" "}
                <a href="https://www.kaushalhomes.com/">www.kaushalhomes.com</a>
              </p>
              <p className="h6"> Mob. No. +9196371-70000</p>
            </strong>
          </div>
        </div>
        <Divider />
        <div className="row gx-0">
          <div className="col ms-2 ">
            To, <span className="h6 fw-bold">{clientData.name}</span>
            <div className="ms-4">
              <p className="fw-semibold">{clientData.address}</p>
              <p className="fw-semibold">Contact No. : {clientData.contact}</p>
            </div>
          </div>
          <VR />
          <div className="col-4">
            <div className="row text-center">
              <p>Quotation Number </p>
              <strong>
                <p>{clientData.quotationNumber}</p>
              </strong>
            </div>
            <hr
              style={{
                margin: 0,
              }}
            />
            <div className="row text-center">
              <p>Quotation Date</p>
              <strong>
                <p>{quotationDate.toLocaleDateString("en-IN")}</p>
              </strong>
            </div>
          </div>
        </div>
        <Divider />
        <div className="row text-center">
          <p className="ms-2">
            Total Carpet Area = {clientData.carpetArea} Sqft
          </p>
        </div>
        <div className="row"></div>
        <div className="row"></div>
        <Divider />
        <table className="my-3 table table-bordered" style={{ width: "100%" }}>
          <thead>
            <tr>
              {COLS.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="text-center"
                  style={{
                    width: `${COLS_SIZES[column] * 10}%`,
                    wordWrap: "break-word",
                    maxWidth: `${COLS_SIZES[column] * 10}%`,
                  }}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(
              (
                {
                  description,
                  serialNumber,
                  isHeader,
                  image,
                  unit,
                  quantity,
                  rate,
                },
                index
              ) => (
                <tr
                  className={`text-center ${isHeader ? "header-row" : ""}`}
                  key={index}
                >
                  <th scope="row">{serialNumber}</th>
                  <td className="text-start">
                    {description
                      ? description.split("\n").map((line, index) => {
                          if (line.startsWith("HH ")) {
                            return (
                              <div
                                className="fw-bold h6 description-header"
                                key={index + line}
                              >
                                {line.replace(/HH /, "")}
                              </div>
                            );
                          } else if (line.startsWith("BB ")) {
                            return (
                              <div
                                key={index + line}
                                className="fw-semibold fst-italic"
                              >
                                {line.replace(/BB /, "")}
                              </div>
                            );
                          } else if (line.startsWith("RR ")) {
                            return (
                              <div key={index + line} className="text-danger">
                                {line.replace(/RR /, "")}
                              </div>
                            );
                          } else if (line.startsWith("BL ")) {
                            return (
                              <div key={index + line} className="text-primary">
                                {line.replace(/BL /, "")}
                              </div>
                            );
                          }
                          return (
                            <div key={index + line}>
                              {line.split("**").map((separatedText, index) =>
                                index % 2 === 1 ? (
                                  <span
                                    key={index + separatedText}
                                    className="fw-semibold"
                                  >
                                    {separatedText}
                                  </span>
                                ) : (
                                  <span key={index + separatedText}>
                                    {separatedText}
                                  </span>
                                )
                              )}
                            </div>
                          );
                        })
                      : null}
                  </td>
                  {isHeader ? (
                    <>
                      <td />
                      <td />
                      <td />
                      <td />
                    </>
                  ) : (
                    <>
                      <td>{quantity}</td>
                      <td>{unit}</td>
                      <td>{to2DecimalPlaces(rate || 0)}</td>
                      <td>{to2DecimalPlaces((quantity || 0) * (rate || 0))}</td>
                    </>
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
        <Divider />

        <div className="row">
          <div className="col ms-2  my-2">
            <p>GST IN: 06GQPPS9076B1Z7</p>
            <strong>for KAUSHAL HOMES</strong>
          </div>
          <VR />
          <div
            className="col-sm-auto text-center my-2 me-2"
            style={{ width: "280px" }}
          >
            <div className="row">
              <div className="col text-start">
                <p>Gross Amount </p>
                <p>Add GST @18%</p>
              </div>
              {/* <VR /> */}
              <div className="col text-end">
                <p>{to2DecimalPlaces(grossAmount)}</p>
                <p>{to2DecimalPlaces(grossAmount * 0.18)}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <strong>
                  Total Amount (INR) &nbsp;
                  {to2DecimalPlaces(grossAmount * 1.18)}
                </strong>
              </div>
            </div>
          </div>
        </div>
        <Divider />
      </div>
    </div>
  );
}
