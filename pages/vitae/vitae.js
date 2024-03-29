import { request, METHOD } from '../../utils/promisfy';
import * as API from '../../config/api.config';
import * as LocalePackage from 'locale-package';
import * as CreditPolicy from '../../config/credit.config';
import feedback from '../../utils/feedback';
import layout from '../../config/landing.config';

const { Store, GlobalActions } = getApp();

Page({
  data: {
    LocalePackage,
    ...CreditPolicy,
    activeNames: ['history'],
    layout
  },
  onLoad: function () {
    let { locale, systemInfo, member } = Store.getState().global;
    // Synchronous storage hook
    this.setData({
      locale, systemInfo, member
    });
  },
  mapStateToPage: function () {
    let newState = Store.getState();
    if (this.data.locale !== newState.global.locale)
      this.setData({
        locale: newState.global.locale
      });
    if (this.data.member !== newState.global.member)
      this.setData({
        member: newState.global.member
      });
  },
  onShow: function () {
    this.unsubscribe = Store.subscribe(() => {
      this.mapStateToPage();
    });
    request(API.MEMBER.GETINFO, METHOD.GET, { openid: Store.getState().global.user.openid })
      .then(res => {
        Store.dispatch(GlobalActions.updateMember(res));
      })
      .catch(e => {
        Store.dispatch(GlobalActions.purgeMember());
      });
  },
  onUnload: function () {
    this.unsubscribe();
  },
  onChange: function ({ detail }) {
    this.setData({
      activeNames: detail
    });
  },
  onPullDownRefresh: function () {
    request(API.MEMBER.GETINFO, METHOD.GET, { openid: Store.getState().global.user.openid })
      .then(res => { 
        Store.dispatch(GlobalActions.updateMember(res));
        wx.stopPullDownRefresh();
        })
      .catch(e => {
        Store.dispatch(GlobalActions.purgeMember());
        wx.stopPullDownRefresh();
      });
  },
  register: function () {
    wx.navigateTo({
      url: '/pages/register/register'
    })
  },
  link: function () {
    wx.navigateTo({
      url: '/pages/link/link'
    })
  },
  feedback
})