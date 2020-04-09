// 组件之间状态通信
const namespaced = true
// TODO 处理state事件
const state = {
  // 放大缩小功能状态，true表示激活，false表示未激活
  zoomState: true,
  // 窗宽、窗位
  lightDarkState: false,
  // 移动
  moveState: false,
  // 长度测量
  measureLengthState: false,
  // 角度测量
  measureAngleState: false,
  // 放大镜
  magnifierState: false,
  // 画笔模式
  penState: false,
  // 反色
  invertColorState: false,
  // 病灶分割结果，true表示可见，false表示不可见
  focusSegState: true,
  // 病灶属性染色结果，true表示可见，false表示不可见
  attrColorSegState: true,
  // 恢复设置
  resumeState: false,
  // 水平翻转
  flipHorizontalState: false,
  // 图片区域
  picAreaState: false,
  // 数据侧边栏
  openSiderState: false
};

const getters = {
  layoutMultiStyle: function (state) {
    if (state.picAreaState === true) {
      return {
        display: 'flex'
      }
    } else {
      return {
        display: 'none'
      }
    }
  },

};

const mutations = {
  SET_ZOOM_STATE (state, flag) {
    state.zoomState = flag
  },
  SET_LIGHT_DARK_STATE (state, flag) {
    state.lightDarkState = flag
  },
  SET_MOVE_STATE (state, flag) {
    state.moveState = flag
  },
  SET_MEASURE_LENGTH_STATE (state, flag) {
    state.measureLengthState = flag
  },
  SET_MEASURE_ANGLE_STATE (state, flag) {
    state.measureAngleState = flag
  },
  SET_MAGNIFIER_STATE (state, flag) {
    state.magnifierState = flag
  },
  SET_PEN_STATE (state, flag) {
    state.penState = flag
  },
  SET_INVERT_COLOR_STATE (state, flag) {
    state.invertColorState = flag
  },
  SET_FOCUS_SEG_STATE (state, flag) {
    state.focusSegState = flag
  },
  SET_ATTR_COLOR_SEG_STATE (state, flag) {
    state.attrColorSegState = flag
  },
  SET_RESUME_STATE (state, flag) {
    state.resumeState = flag
  },
  SET_FLIP_HORIZONTAL_STATE (state, flag) {
    state.flipHorizontalState = flag
  },
  SET_PIC_AREA_STATE (state, flag) {
    state.picAreaState = flag
  },
  SET_OPEN_SIDER_STATE (state, flag) {
    state.openSiderState = flag
  }
};

const actions = {
  set_zoom_state ({commit}, flag) {
    commit('SET_ZOOM_STATE', flag)
  },
  set_light_dark_state ({commit}, flag) {
    commit('SET_LIGHT_DARK_STATE', flag)
  },
  set_move_state ({commit}, flag) {
    commit('SET_MOVE_STATE', flag)
  },
  set_measure_length_state ({commit}, flag) {
    commit('SET_MEASURE_LENGTH_STATE', flag)
  },
  set_measure_angle_state ({commit}, flag) {
    commit('SET_MEASURE_ANGLE_STATE', flag)
  },
  set_magnifier_state ({commit}, flag) {
    commit('SET_MAGNIFIER_STATE', flag)
  },
  set_pen_state ({commit}, flag) {
    commit('SET_PEN_STATE', flag)
  },
  set_invert_color_state ({commit}, flag) {
    commit('SET_INVERT_COLOR_STATE', flag)
  },
  set_focus_seg_state ({commit}, flag) {
    commit('SET_FOCUS_SEG_STATE', flag)
  },
  set_attr_color_seg_state ({commit}, flag) {
    commit('SET_ATTR_COLOR_SEG_STATE', flag)
  },
  set_resume_state ({commit}, flag) {
    commit('SET_RESUME_STATE', flag)
  },
  set_flip_horizontal_state ({commit}, flag) {
    commit('SET_FLIP_HORIZONTAL_STATE', flag)
  },
  set_pic_area_state ({commit}, flag) {
    commit('SET_PIC_AREA_STATE', flag)
  },
  set_open_sider_state ({commit}, flag) {
    commit('SET_OPEN_SIDER_STATE', flag)
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced
}
