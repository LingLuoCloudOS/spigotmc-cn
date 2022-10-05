import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '社区驱动',
    Svg: require('@site/static/img/engineering_team.svg').default,
    description: (
      <>
        开源, 所有文章来自于 Spigot 官方文档, 其来源于人们自发参与贡献.
      </>
    ),
  },
  {
    title: '易于查阅',
    Svg: require('@site/static/img/books_re.svg').default,
    description: (
      <>
        文档结构合理/条理清晰, 带有搜索功能, 便于查找与系统学习.
      </>
    ),
  },
  {
    title: '及时更新',
    Svg: require('@site/static/img/services_re.svg').default,
    description: (
      <>
        紧随 Spigot 官方文档更新, 确保匹配官网文档进度, 可以通过开源社区自发贡献.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
