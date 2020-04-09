<template>
    <div :class="layoutMultiClass" ref="layoutMulti" :style="displayStyle">
        <div class="layout-multi-scroll">
            <div v-for="(item,index) in items" :key="item.src" @click="set_click_index($event,index)"
                 :style="thumbnailStyle(index)">
                <thumbnail :date="item.date" :imgPath="item.src" :image_index="index"
                           :patient-name="item.patientName"></thumbnail>
            </div>
        </div>
        <div class="layout-multi-showMulti" @click="showOrHidden">
            <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 14 60"
                 style="fill: currentcolor; vertical-align: middle; cursor: pointer; width: 14px; height: 60px;">
                <g>
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g transform="translate(-219.000000, -532.000000)">
                            <g transform="translate(58.000000, 51.000000)">
                                <g id="Group-16" transform="translate(161.000000, 481.000000)">
                                    <path d="M0,-3.55271368e-15 L12.5494423,3.58555493 C13.4080454,3.83087011 14,4.61564211 14,5.50860283 L14,54.4913972 C14,55.3843579 13.4080454,56.1691299 12.5494423,56.4144451 L0,60 L0,-3.55271368e-15 Z"
                                          id="矩形" fill="#27272B"></path>
                                    <rect id="矩形" fill="#FFFFFF" opacity="0.199984" x="5" y="17" width="4" height="26"
                                          rx="2"></rect>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    </div>
</template>

<script>
    import Thumbnail from './Thumbnail'
    import eventBus from "../../main/eventBus";

    export default {
        name: 'LayoutMulti',
        components: {
            Thumbnail
        },
        data() {
            return {
                layoutMultiClass: 'layout-multi',
                displayStyle: {
                    display: 'none'
                }
            }
        },
        computed: {
            items() {
                // 上传的所有图片信息
                console.log('触发computed');
                const items = this.$store.getters['ThriftClient/items'];
                eventBus.$emit('itemsChange',items);
                this.$store.dispatch('ThriftClient/set_click_index',0);
                return items;
            },

            click_index() {
                return this.$store.getters['ThriftClient/click_index']
            }
        },
        methods: {
            thumbnailStyle(index) {
                let color = this.click_index === index ? '#272' : '#1e2023';
                return 'background: '+ color
            },
            showOrHidden(event) {
                // 显示或者隐藏图片选择区域
                if (this.layoutMultiClass === 'layout-multi') {
                    this.layoutMultiClass = 'layout-multi-closed'
                } else if (this.layoutMultiClass === 'layout-multi-closed') {
                    this.layoutMultiClass = 'layout-multi'
                }
            },
            set_click_index(event, index) {
                this.$store.dispatch('ThriftClient/set_click_index', index);
            }
        },
        created() {
            eventBus.$on('openOrClosePicAreaClick', ()=>{
                if (this.displayStyle.display === 'none') {
                    this.displayStyle.display = 'flex';
                } else {
                    this.displayStyle.display  = 'none';
                }
            })
        }

    }
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    .layout-multi {
        position: relative;
        flex-direction: column;
        width: 200px;
        border-top: 1px solid #000;
        border-left: 1px solid #1a1a1c;
    }

    .layout-multi-closed {
        position: relative;
        flex-direction: column;
        width: 0;
        background: #27272b;
        border-top: 1px solid #000;
        border-left: 1px solid #1a1a1c;
    }

    .layout-multi-showMulti {
        position: absolute;
        top: 40%;
        right: -14px;
        z-index: 1;
        background: transparent;
        text-align: left;
        cursor: pointer;
    }

    .layout-multi-scroll {
        overflow: scroll;
        flex: 1 1;
        background: #27272b;
    }

    .layout-multi-scroll::-webkit-scrollbar {
        display: block;
        width: 0;
        height: 1px;
    }

    ::-webkit-scrollbar {
        display: none;
    }

    .layout-multi-scroll::-webkit-scrollbar-corner {
        display: none;
    }

    .layout-multi-scroll::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: #545358;
    }

    .layout-multi-scroll::-webkit-scrollbar-track {
        border-radius: 9px;
        background: #27272b;
    }

    ::selection {
        background: #1890ff;
        color: #fff
    }

</style>
