import { cluster } from "../map.js";

export const changeColorClusters = () =>  {
    const rootStyles = getComputedStyle(document.documentElement);
    const mainColor = rootStyles.getPropertyValue('--basic').trim();

    let clusters = cluster.getClusters();

    clusters.forEach((cluster) => {
        let checkPrice = false;
        cluster.properties.get('geoObjects').forEach((item) => {
            if (item.properties.get('price') && checkPrice === false) {
                checkPrice = true;
                cluster.options.set('clusterIconColor', mainColor);
            }
        })
    });
}
