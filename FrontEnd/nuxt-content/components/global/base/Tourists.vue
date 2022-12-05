<template>
    <div id="echarts-container"></div>
</template>

<script>
export default {
    mounted() {
        axios.get('https://plantree.me/geo.json').then(res => {
            const data = res.data.cities
            const geoCoordMap = res.data.coordMap
            console.log(this.data, this.geoCoordMap)

            var dom = document.getElementById('echarts-container');
            var myChart = echarts.init(dom, null, {
                renderer: 'canvas',
                useDirtyRect: false,
            });
            var app = {};

            var option;

            const convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i]];
                    if (geoCoord) {
                        res.push({
                            name: data[i],
                            value: geoCoord.concat(100)
                        });
                    }
                }
                return res;
            };
            option = {
                // title: {
                //     text: 'Visited Places',
                //     left: 'center'
                // },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}'
                },
                bmap: {
                    center: [104.114129, 37.550339],
                    zoom: 4,
                    roam: true,
                    mapStyle: {
                        styleJson: [
                            {
                                featureType: 'water',
                                elementType: 'all',
                                stylers: {
                                    color: '#d1d1d1'
                                }
                            },
                            {
                                featureType: 'land',
                                elementType: 'all',
                                stylers: {
                                    color: '#f3f3f3'
                                }
                            },
                            {
                                featureType: 'railway',
                                elementType: 'all',
                                stylers: {
                                    visibility: 'off'
                                }
                            },
                            {
                                featureType: 'highway',
                                elementType: 'all',
                                stylers: {
                                    color: '#fdfdfd'
                                }
                            },
                            {
                                featureType: 'highway',
                                elementType: 'labels',
                                stylers: {
                                    visibility: 'off'
                                }
                            },
                            {
                                featureType: 'arterial',
                                elementType: 'geometry',
                                stylers: {
                                    color: '#fefefe'
                                }
                            },
                            {
                                featureType: 'arterial',
                                elementType: 'geometry.fill',
                                stylers: {
                                    color: '#fefefe'
                                }
                            },
                            {
                                featureType: 'poi',
                                elementType: 'all',
                                stylers: {
                                    visibility: 'off'
                                }
                            },
                            {
                                featureType: 'green',
                                elementType: 'all',
                                stylers: {
                                    visibility: 'off'
                                }
                            },
                            {
                                featureType: 'subway',
                                elementType: 'all',
                                stylers: {
                                    visibility: 'off'
                                }
                            },
                            {
                                featureType: 'manmade',
                                elementType: 'all',
                                stylers: {
                                    color: '#d1d1d1'
                                }
                            },
                            {
                                featureType: 'local',
                                elementType: 'all',
                                stylers: {
                                    color: '#d1d1d1'
                                }
                            },
                            {
                                featureType: 'arterial',
                                elementType: 'labels',
                                stylers: {
                                    visibility: 'off'
                                }
                            },
                            {
                                featureType: 'boundary',
                                elementType: 'all',
                                stylers: {
                                    color: '#fefefe'
                                }
                            },
                            {
                                featureType: 'building',
                                elementType: 'all',
                                stylers: {
                                    color: '#d1d1d1'
                                }
                            },
                            {
                                featureType: 'label',
                                elementType: 'labels.text.fill',
                                stylers: {
                                    color: '#999999'
                                }
                            }
                        ]
                    }
                },
                series: [
                    {
                        name: 'city',
                        type: 'scatter',
                        coordinateSystem: 'bmap',
                        data: convertData(data),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        }
                    }
                ]
            };

            if (option && typeof option === 'object') {
                myChart.setOption(option);
            }

            window.addEventListener('resize', myChart.resize);
        })   
    }
}
</script>

<style>
#echarts-container {
    position: relative;
    height: 60vh;
    overflow: hidden;
    background-color: rgb(255, 255, 255);
}
</style>