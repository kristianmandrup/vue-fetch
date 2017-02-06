/**
 * Created by bangbang93 on 2016/12/9.
 */
'use strict';

import 'whatwg-fetch'
import 'url-search-params-polyfill'
import ES6Promise from 'es6-promise'

const VueFetch = {
  get(url, query){
    if (query){
      if (typeof query != 'string'){
        query = objToSearch(query);
      }
      url = `${url}?${query}`
    }
    return fetch(url, {credentials: 'include'});
  },
  post(url, body){
    return fetch(url, {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify(body),
      credentials: 'include',
    })
  },
  put(url, body){
    return fetch(url, {
      method: 'put',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify(body),
      credentials: 'include',
    })
  },
  patch(url, body){
    return fetch(url, {
      method: 'PATCH',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify(body),
      credentials: 'include',
    })
  },
  del(url, query){
    if (query){
      if (typeof query != 'string'){
        query = objToSearch(query);
      }
      url = `${url}?${query}`;
    }
    return fetch(url, {
      method: 'DELETE',
      credentials: 'include'
    });
  },
  fetch(method, url, query, body){
    if (query){
      if (typeof query != 'string'){
        query = objToSearch(query);
      }
      url = `${url}?${query}`
    }
    let options = {
      method: method.toUpperCase(),
      credentials: 'include'
    };
    if (body){
      options.headers = new Headers({
        'content-type': 'application/json'
      });
      options.body = JSON.stringify(body);
    }
    return fetch(url, options);
  }
};



export default {
  install: function (Vue, options = {polyfill: true}) {
    Vue.prototype.$fetch = VueFetch;
    if (options.polyfill){
      ES6Promise.polyfill();
    }
  }
}

function objToSearch(obj){
  let query = new URLSearchParams();
  let keys = Object.keys(obj);
  keys.forEach((key)=>{
    query.set(key, obj[key]);
  });
  return query.toString();
}