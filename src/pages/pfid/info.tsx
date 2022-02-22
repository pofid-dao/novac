import React, { Component } from 'react';
import { Divider, Row, Col, Statistic, Button } from 'antd';
import './my.css';
import burned from '@/service/burned';
import BigNumber from 'bignumber.js';
import i18n from '../../i18n';

const total = 10000000;
import { Pie, measureTextWidth } from '@ant-design/plots';

interface Props {
  data?: Array<any>;
}
const DemoPie: React.FC<Props> = ({ data }) => {
  function renderStatistic(containerWidth, text, style) {
    const { width: textWidth, height: textHeight } = measureTextWidth(
      text,
      style,
    );
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(
            Math.pow(R, 2) /
              (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)),
          ),
        ),
        1,
      );
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
      scale < 1 ? 1 : 'inherit'
    };">${text}</div>`;
  }
  if (!data) {
    data = [
      {
        type: i18n.t('posNotMinted'),
        value: 0,
      },
      {
        type: i18n.t('burned'),
        value: 0,
      },
      {
        type: i18n.t('circulating'),
        value: 0,
      },
    ];
  }

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: v => `${v} PFID`,
      },
    },
    label: {
      type: 'inter',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : i18n.t('total');
          return renderStatistic(d, text, {
            fontSize: 24,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '24px',
        },
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect();
          const text = datum
            ? `${datum.value}`
            : `${data.reduce((r, d) => r + d.value, 0)} PFID`;
          return renderStatistic(width, text, {
            fontSize: 20,
          });
        },
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };
  return <Pie {...config} />;
};

class PofidInfo extends Component<any, any> {
  state = {
    burned: 0,
    data: 0,
    chartData: [],
  };

  componentDidMount(): void {
    this.init().catch(e => {
      console.error(e);
    });
  }

  init = async () => {
    const burnValue = await burned.getTotalBurned('PFID');
    const bv = new BigNumber(burnValue).plus(0).toNumber();
    const data = new BigNumber(
      new BigNumber(total)
        .minus(5008055)
        .minus(new BigNumber(bv))
        .toFixed(0),
    ).toNumber();

    const chartData = [
      {
        type: i18n.t('posNotMinted'),
        value: 5008055,
      },
      {
        type: i18n.t('burned'),
        value: bv,
      },
      {
        type: i18n.t('circulating'),
        value: data,
      },
    ];
    this.setState({
      burned: bv,
      data: data,
      chartData: chartData,
    });
  };

  render() {
    const { data, burned, chartData } = this.state;
    return (
      <>
        <div>
          <h1>{i18n.t('menus_pfid_info')}</h1>
          <Divider dashed />
          <Row>
            <Col span={8}>
              <Statistic title={i18n.t('total')} value={total} suffix="PFID" />
            </Col>
            <Col span={8}>
              <Statistic
                title={i18n.t('posMinted')}
                value={91945}
                suffix="PFID"
              />
            </Col>
            <Col span={8}>
              <Statistic
                title={i18n.t('posNotMinted')}
                value={5008055}
                suffix="PFID"
              />
            </Col>
            <Col span={8}>
              <Statistic
                title={i18n.t('burned')}
                value={burned}
                suffix="PFID"
              />
            </Col>
            <Col span={8}>
              <Statistic
                title={i18n.t('circulating')}
                value={data}
                suffix="PFID"
              />
            </Col>
          </Row>
        </div>
        <Divider dashed />
        <div>
          <DemoPie data={chartData} />
        </div>
      </>
    );
  }
}

export default PofidInfo;
