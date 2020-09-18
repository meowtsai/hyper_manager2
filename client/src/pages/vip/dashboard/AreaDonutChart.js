// @flow
import React, { useMemo } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { Donut, Legend, ResponsiveContainer } from "britecharts-react";

// donut chart
const AreaDonutChart = ({ data = [] }) => {
  //console.log("AreaDonutChart", data);

  const dataSum = useMemo(
    () => data.reduce((acc, curr) => acc + parseInt(curr.cnt), 0),
    [data]
  );
  //const donutData =  data.map((d,index) => { name: "Shiny", id: 1, quantity: 86, percentage: 5 },  )

  const dataOther = data.slice(7).reduce(
    (acc, curr) => ({
      ...acc,
      area: "其他",
      cnt: acc.cnt ? curr.cnt + acc.cnt : curr.cnt,
    }),
    {}
  );
  //   console.log("data.slice(6)", data.slice(6));
  //   console.log("data.slice(0,6)", data.slice(0, 6));
  const donutData = data.slice(0, 7).map((d, index) => {
    return {
      name: d.area,
      id: index,
      quantity: d.cnt,
      percentage: ((d.cnt / dataSum) * 100).toFixed(0),
    };
  });

  donutData.push({
    name: dataOther.area,
    id: 7,
    quantity: dataOther.cnt,
    percentage: ((dataOther.cnt / dataSum) * 100).toFixed(0),
  });
  //   [
  //     { name: "Shiny", id: 1, quantity: 86, percentage: 5 },
  //     { name: "Blazing", id: 2, quantity: 300, percentage: 18 },
  //     { name: "Dazzling", id: 3, quantity: 276, percentage: 16 },
  //     { name: "Radiant", id: 4, quantity: 195, percentage: 11 },
  //     { name: "Sparkling", id: 5, quantity: 36, percentage: 2 },
  //     { name: "Other", id: 0, quantity: 814, percentage: 48 },
  //   ];

  return (
    <Card>
      <CardBody>
        <h4 className="header-title mb-4">縣市分布</h4>
        <div className="donut-container">
          <ResponsiveContainer
            render={() => (
              <Row>
                <Col>
                  <Donut
                    data={donutData}
                    height={300}
                    internalRadius={80}
                    colorSchema={[
                      "#727cf5",
                      "#0acf97",
                      "#6c757d",
                      "#fa5c7c",
                      "#ffbc00",
                      "#39afd1",
                      "#6aedc7", //green
                      "#39c2c9", //blue
                      "#ffce00", //yellow
                      "#ffa71a", //orange
                      "#f866b9", //pink
                      "#998ce3", //purple
                    ]}
                    isAnimated={false}
                    hasFixedHighlightedSlice={true}
                  />
                </Col>
                <Col>
                  <Legend
                    data={donutData}
                    height={200}
                    width={250}
                    numberFormat={"s"}
                    colorSchema={[
                      "#727cf5",
                      "#0acf97",
                      "#6c757d",
                      "#fa5c7c",
                      "#ffbc00",
                      "#39afd1",
                      "#6aedc7", //green
                      "#39c2c9", //blue
                      "#ffce00", //yellow
                      "#ffa71a", //orange
                      "#f866b9", //pink
                      "#998ce3", //purple
                    ]}
                    margin={{ top: 10, bottom: 10, left: 0, right: 30 }}
                  />
                </Col>
              </Row>
            )}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default AreaDonutChart;
