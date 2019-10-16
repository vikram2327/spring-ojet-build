/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","jquery","ojs/ojeventtarget","ojs/ojdataprovider"],function(t,e){var i=function(){function e(t){this.dataProvider=t,this._KEY="key",this._KEYS="keys",this._STARTINDEX="startIndex",this._PAGESIZE="pageSize",this._OFFSET="offset",this._SIZE="size",this._PAGE="page",this._PAGECOUNT="pageCount",this._TOTALSIZE="totalsize",this._PREVIOUSPAGE="previousPage",this._BEFOREPAGE="beforePage",this._DONE="done",this._VALUE="value",this._DATA="data",this._REFRESH="refresh",this._MUTATE="mutate",this._SORTCRITERIA="sortCriteria",this._FILTERCRITERION="filterCriterion",this._METADATA="metadata",this._RESULTS="results",this._FETCHPARAMETERS="fetchParameters",this._CONTAINSPARAMETERS="containsParameters",this._CONTAINSKEYS="containsKeys",this._FETCHBYKEYS="fetchByKeys",this._FETCHBYOFFSET="fetchByOffset",this._AFTERKEYS="afterKeys",this._ADDBEFOREKEYS="addBeforeKeys",this._ADD="add",this._REMOVE="remove",this._UPDATE="update",this._INDEXES="indexes",this.AsyncIterable=function(){return function(t,e){this._parent=t,this._asyncIterator=e,this[Symbol.asyncIterator]=function(){return this._asyncIterator}}}(),this.AsyncIterator=function(){function t(t,e,i){this._parent=t,this._nextFunc=e,this._params=i}return t.prototype.next=function(){var t=this._nextFunc(this._params);return Promise.resolve(t)},t}(),this.AsyncIteratorResult=function(){return function(t,e,i){this._parent=t,this.value=e,this.done=i,this[t._VALUE]=e,this[t._DONE]=i}}(),this.FetchListParameters=function(){return function(t,e,i,r){this._parent=t,this.size=e,this.sortCriteria=i,this.filterCriterion=r,this[t._SIZE]=e,this[t._SORTCRITERIA]=i,this[t._FILTERCRITERION]=r}}(),this.FetchListResult=function(){return function(t,e,i,r){this._parent=t,this.fetchParameters=e,this.data=i,this.metadata=r,this[t._FETCHPARAMETERS]=e,this[t._DATA]=i,this[t._METADATA]=r}}(),this.FetchByOffsetParameters=function(){return function(t,e,i,r,n){this._parent=t,this.offset=e,this.size=i,this.sortCriteria=r,this.filterCriterion=n,this[t._SIZE]=i,this[t._SORTCRITERIA]=r,this[t._OFFSET]=e,this[t._FILTERCRITERION]=n}}(),this.FetchByOffsetResults=function(){return function(t,e,i,r){this._parent=t,this.fetchParameters=e,this.results=i,this.done=r,this[t._FETCHPARAMETERS]=e,this[t._RESULTS]=i,this[t._DONE]=r}}(),this.FetchByKeysResults=function(){return function(t,e,i){this._parent=t,this.fetchParameters=e,this.results=i,this[t._FETCHPARAMETERS]=e,this[t._RESULTS]=i}}(),this.ContainsKeysResults=function(){return function(t,e,i){this._parent=t,this.containsParameters=e,this.results=i,this[t._CONTAINSPARAMETERS]=e,this[t._RESULTS]=i}}(),this.ItemMetadata=function(){return function(t,e){this._parent=t,this.key=e,this[t._KEY]=e}}(),this.DataProviderMutationEventDetail=function(){return function(t,e,i,r){this._parent=t,this.add=e,this.remove=i,this.update=r,this[t._ADD]=e,this[t._REMOVE]=i,this[t._UPDATE]=r}}(),this.DataProviderOperationEventDetail=function(){return function(t,e,i,r,n){this._parent=t,this.keys=e,this.metadata=i,this.data=r,this.indexes=n,this[t._KEYS]=e,this[t._METADATA]=i,this[t._DATA]=r,this[t._INDEXES]=n}}(),this.DataProviderAddOperationEventDetail=function(){return function(t,e,i,r,n,a,s){this._parent=t,this.keys=e,this.afterKeys=i,this.addBeforeKeys=r,this.metadata=n,this.data=a,this.indexes=s,this[t._KEYS]=e,this[t._AFTERKEYS]=i,this[t._ADDBEFOREKEYS]=r,this[t._METADATA]=n,this[t._DATA]=a,this[t._INDEXES]=s}}();var e=this;this._addEventListeners(t),this._currentPage=-1,this._pageSize=-1,this._offset=0,this._totalSize=-1,this._skipCriteriaCheck=!1,this._isInitialized=new Promise(function(t){e._resolveFunc=t}),this._isInitialDataLoaded=new Promise(function(t){e._dataResolveFunc=t}),this._hasMutated=!1,this._mustRefetch=!1,this._isFetchingForMutation=!1,this._mutationEventQueue=[],this._isMutating=null,this._mutationFunc=null,this._doRefreshEvent=!1,this._mutatingTotalSize=null,this._fetchMore=!1}return e.prototype.containsKeys=function(t){var e=this;return this._checkIfDataInitialized(function(){return e.dataProvider[e._CONTAINSKEYS](t).then(function(i){var r=i.results;if(e._isGlobal(t))return new e.ContainsKeysResults(e,t,r);var n=new Set,a=e._getCurrentPageKeys();return r.forEach(function(t){-1!=a.indexOf(t)&&n.add(t)}),new e.ContainsKeysResults(e,t,n)})})},e.prototype.fetchByKeys=function(t){var e=this;return this._checkIfDataInitialized(function(){var i=t.keys;if(e._isGlobal(t)){if(e.dataProvider[e._FETCHBYKEYS])return e.dataProvider[e._FETCHBYKEYS](t);throw new Error("Global scope not supported for this dataprovider")}return e._fetchByOffset(new e.FetchByOffsetParameters(e,e._offset,e._pageSize,e._currentSortCriteria,e._currentFilterCriteria)).then(function(r){var n=r.results,a=new Map;return n.map(function(t){if(i.has(t[e._METADATA][e._KEY]))return t}).forEach(function(t){t&&a.set(t[e._METADATA][e._KEY],t)}),new e.FetchByKeysResults(e,t,a)})})},e.prototype.fetchByOffset=function(t){var e=this;return this._checkIfDataInitialized(function(){var i=null!=t&&t[e._OFFSET]>0?t[e._OFFSET]:0;return t=new e.FetchByOffsetParameters(e,e._offset,e._pageSize,e._currentSortCriteria,e._currentFilterCriteria),e._fetchByOffset(t).then(function(r){var n=r.results.filter(function(t,e){return e>=i});return new e.FetchByOffsetResults(e,e._getLocalParams(t),n,r.done)})})},e.prototype.fetchFirst=function(t){var e=this,i=null!=t?t[e._SORTCRITERIA]:null,r=null!=t?t[e._FILTERCRITERION]:null,n={};e._skipCriteriaCheck?e._skipCriteriaCheck=!1:e._isSameCriteria(i,r)||(e._currentSortCriteria=i,e._currentFilterCriteria=r,e._offset=0,0!=e._currentPage&&(n[e._PREVIOUSPAGE]=e._currentPage,e._currentPage=0,n[e._PAGE]=e._currentPage));var a=e._offset,s=e._pageSize;return new e.AsyncIterable(e,new e.AsyncIterator(e,function(){var t=new e.FetchByOffsetParameters(e,a,s,e._currentSortCriteria,e._currentFilterCriteria);return e._checkIfDataInitialized(function(){return e._fetchByOffset(t).then(function(t){var i=t.results,r=i.map(function(t){return t[e._DATA]}),s=i.map(function(t){return t[e._METADATA]});a+=s.length,null!=n[e._PAGE]&&(e.dispatchEvent(new CustomEvent(e._PAGE,{detail:n})),n={});var u=new e.FetchByOffsetParameters(e,t.fetchParameters.offset,e._pageSize,e._currentSortCriteria);return Promise.resolve(new e.AsyncIteratorResult(e,new e.FetchListResult(e,u,r,s),t[e._DONE]))})})},t))},e.prototype.getCapability=function(t){return this.dataProvider.getCapability(t)},e.prototype.getTotalSize=function(){var t=this;return this._checkIfInitialized(function(){return new Promise(function(e){e(t._pageSize)})})},e.prototype.isEmpty=function(){return this.dataProvider.isEmpty()},e.prototype.getPage=function(){return this._currentPage},e.prototype.setPage=function(e,i){var r=this;return this._mutationBusyContext(function(){e=parseInt(e,10);var n={};n[r._PAGE]=e,n[r._PREVIOUSPAGE]=r._currentPage,r.dispatchEvent(new CustomEvent(r._BEFOREPAGE,n)),null!=i[r._PAGESIZE]&&(r._pageSize=i[r._PAGESIZE]),r._offset=parseInt(e,10)*r._pageSize,r._currentPage=e,null!=r._isInitialized&&(r._resolveFunc(!0),r._updateTotalSize());var a=new r.FetchByOffsetParameters(r,r._offset,r._pageSize,r._currentSortCriteria,r._currentFilterCriteria);return r._fetchByOffset(a).then(function(e){var i=e.results;0!==i.length?(r._endItemIndex=r._offset+i.length-1,r._skipCriteriaCheck=!0,r.dispatchEvent(new CustomEvent(r._PAGE,{detail:n})),r._updateTotalSize()):0===r._currentPage&&(r._offset=0,r._endItemIndex=0),r._doRefreshEvent?(r._hasMutated=!0,r.dispatchEvent(new t.DataProviderRefreshEvent)):(r._dataResolveFunc(!0),r._doRefreshEvent=!0)})})},e.prototype.getStartItemIndex=function(){return this._offset},e.prototype.getEndItemIndex=function(){return this._endItemIndex},e.prototype.getPageCount=function(){return this._pageCount},e.prototype.totalSize=function(){return this._totalSize},e.prototype.totalSizeConfidence=function(){return-1===this._totalSize?"unknown":"actual"},e.prototype.getGlobalIndex=function(t){return this._offset+t},e.prototype.getLocalIndex=function(t){return t-this._offset},e.prototype._getLocalParams=function(t){return new this.FetchByOffsetParameters(this,this.getLocalIndex(t.offset),t.size,t.sortCriteria,t.filterCriterion)},e.prototype._updateTotalSize=function(){var t=this,e=t._totalSize,i=t._pageCount;return this._checkIfInitialized(function(){return t.dataProvider.getTotalSize().then(function(r){if(t._totalSize=r,-1!==t._totalSize){if(t._pageCount=Math.ceil(t._totalSize/t._pageSize),t._offset>=t._totalSize){t._offset=t._totalSize-t._totalSize%t._pageSize,t._endItemIndex=t._totalSize-1;var n=Math.floor(t._totalSize/t._pageSize);if(t._currentPage!=n){var a={};a[t._PAGE]=n,a[t._PREVIOUSPAGE]=t._currentPage,t.dispatchEvent(new CustomEvent(t._PAGE,{detail:a})),t._currentPage=n}}i!=t._pageCount?t.dispatchEvent(new CustomEvent(t._PAGECOUNT,{detail:{previousValue:i,value:t._pageCount}})):e!=t._totalSize&&t.dispatchEvent(new CustomEvent(t._TOTALSIZE,{detail:{previousValue:e,value:t._totalSize}}))}return t._pageSize})})},e.prototype._mutationBusyContext=function(t){var e=this;return this._isMutating?e._isMutating.then(function(){return e._isMutating=null,t()}):t()},e.prototype._setupMutationBusyContext=function(){var t=this;this._isMutating=new Promise(function(e){t._mutationFunc=e})},e.prototype._checkIfInitialized=function(t){var e=this;return this._isInitialized?e._isInitialized.then(function(i){if(i&&-1!=e._currentPage)return e._isInitialized=null,t();throw e._isInitialized=null,new Error("Paging DataProvider View incorrectly initialized")}):t()},e.prototype._checkIfDataInitialized=function(t){var e=this;return this._isInitialDataLoaded?e._isInitialDataLoaded.then(function(i){if(i&&-1!=e._currentPage)return e._isInitialDataLoaded=null,t();throw e._isInitialDataLoaded=null,new Error("Paging DataProvider View incorrectly initialized")}):t()},e.prototype._getCurrentPageKeys=function(){var t=this;return this._currentResults.map(function(e){return e[t._METADATA][t._KEY]})},e.prototype._isSameParams=function(t){return this._currentParams[this._SIZE]===t[this._SIZE]&&this._currentParams[this._OFFSET]===t[this._OFFSET]&&this._currentParams[this._SORTCRITERIA]===t[this._SORTCRITERIA]&&this._currentParams[this._FILTERCRITERION]===t[this._FILTERCRITERION]},e.prototype._isSameCriteria=function(t,e){if(t){if(!this._currentSortCriteria||t[0].attribute!=this._currentSortCriteria[0].attribute||t[0].direction!=this._currentSortCriteria[0].direction)return!1}else if(this._currentSortCriteria)return!1;if(e){if(!this._currentFilterCriteria||e[0].op!=this._currentFilterCriteria[0].op||e[0].filter!=this._currentFilterCriteria[0].filter)return!1}else if(this._currentFilterCriteria)return!1;return!0},e.prototype._isGlobal=function(t){return null!=t.scope&&"global"===t.scope},e.prototype._getCurrentPageData=function(){var t=this;return t._currentParams&&t._currentParams.offset===t._offset&&t._currentParams.size===t._pageSize?t._currentResults&&!t._hasMutated?new Promise(function(e){e(new t.FetchByOffsetResults(t,t._getLocalParams(t._currentParams),t._currentResults,t._currentIsDone))}):t._fetchByOffset(t._currentParams).then(function(t){return t}):t._fetchByOffset(new t.FetchByOffsetParameters(t,t._offset,t._pageSize,t._currentSortCriteria,t._currentFilterCriteria)).then(function(t){return t})},e.prototype._fetchByOffset=function(t){var e=this;return this._checkIfInitialized(function(){return e._currentParams&&e._isSameParams(t)&&!e._hasMutated?new Promise(function(t){t(new e.FetchByOffsetResults(e,e._getLocalParams(e._currentParams),e._currentResults,e._currentIsDone))}):0===(t=e._cleanFetchParams(t)).size?(e._currentIsDone=!0,e._currentResults=[],e._currentParams=t,new Promise(function(i){i(new e.FetchByOffsetResults(e,e._getLocalParams(t),[],e._currentIsDone))})):e._fetchByOffsetHelper(t)})},e.prototype._fetchByOffsetHelper=function(t){var e=this;return e.dataProvider[e._FETCHBYOFFSET](t).then(function(i){e._currentIsDone=i.done,e._fetchMore?e._currentResults=e._currentResults.concat(i.results):(e._currentResults=i.results,e._currentParams=t),e._fetchMore=!1;var r=e._currentResults.length,n=e._offset+r;if(i.done)e._pageCount=Math.ceil(n/e._pageSize);else if(!i.done&&r<e._pageSize){e._fetchMore=!0;var a=new e.FetchByOffsetParameters(e,n,e._pageSize-r,e._currentSortCriteria,e._currentFilterCriteria);return e._fetchByOffsetHelper(a)}return(e._pageSize==e._currentResults.length||e._currentResults.length+e._offset>=e._totalSize)&&(e._currentIsDone=!0),e._hasMutated=!1,new e.FetchByOffsetResults(e,e._getLocalParams(t),e._currentResults,e._currentIsDone)}).catch(function(t){return e._hasMutated=!1,e._fetchMore=!1,e._currentIsDone=null,e._currentResults=null,e._currentParams=null,Promise.reject(t)})},e.prototype._cleanFetchParams=function(t){var e=t.offset;(e>=this._offset+this._pageSize||e<this._offset)&&(e=this._offset);var i=t.size;i<=0&&(i=this._pageSize),e+i>this._offset+this._pageSize&&(i=this._offset+this._pageSize-e);var r=null===this._mutatingTotalSize?this._totalSize:this._mutatingTotalSize;return r>0&&e+i>r&&(i=r-e),new this.FetchByOffsetParameters(this,e,i,t.sortCriteria,t.filterCriterion)},e.prototype._mutationEventDataFetcher=function(t){var e=this;this.dataProvider.getTotalSize().then(function(i){i>0&&(e._mutatingTotalSize=i,e._offset>=i&&(e._offset=i-i%e._pageSize,e._endItemIndex=i-1)),e._getCurrentPageData().then(function(i){e._mustRefetch?(e._mustRefetch=!1,e._hasMutated=!0,e._mutationEventDataFetcher(t)):t(i)}).catch(function(i){if(!e._mustRefetch)return Promise.reject(i);e._mustRefetch=!1,e._hasMutated=!0,e._mutationEventDataFetcher(t)})})},e.prototype._processMutationEventsByKey=function(e){var i=[],r=[],n=[],a=new Set,s=[],u=[],o=[],_=new Set,h=[],c=[],f=[],l=new Set,d=this._currentResultsForMutation.map(function(t,e){return{item:t,index:e}}),E=e.results.map(function(t,e){return{item:t,index:e}}),p=d.map(function(t){return t.item.metadata.key}),S=E.map(function(t){return t.item.metadata.key}),m=d.filter(function(t){return S.indexOf(t.item.metadata.key)<0}),P=E.filter(function(t){return p.indexOf(t.item.metadata.key)<0}),v=d.filter(function(t){var e=S.indexOf(t.item.metadata.key);return e>-1&&E[e].item.data!=t.data});P.length>0&&(P.forEach(function(t){s.push(E[t.index].item.metadata),u.push(E[t.index].item.data),o.push(t.index)}),s.map(function(t){_.add(t.key)})),m.length>0&&(m.forEach(function(t){i.push(d[t.index].item.metadata),r.push(d[t.index].item.data),n.push(t.index)}),i.map(function(t){a.add(t.key)})),v.length>0&&(v.forEach(function(t){h.push(d[t.index].item.metadata),c.push(d[t.index].item.data),f.push(t.index)}),h.map(function(t){l.add(t.key)}));var g=null,y=null,I=null;if(o.length>0&&(g=new this.DataProviderAddOperationEventDetail(this,_,null,null,s,u,o)),n.length>0&&(y=new this.DataProviderOperationEventDetail(this,a,i,r,n)),f.length>0&&(I=new this.DataProviderOperationEventDetail(this,l,h,c,f)),null!=g||null!=y||null!=I){var R=new this.DataProviderMutationEventDetail(this,g,y,I);this.dispatchEvent(new t.DataProviderMutationEvent(R))}},e.prototype._addEventListeners=function(e){var i=this;e.addEventListener(this._REFRESH,function(e){i._hasMutated||(i._hasMutated=!0,i._updateTotalSize().then(function(){i.setPage(0,{pageSize:i._pageSize}).then(function(){0===i._endItemIndex&&i.dispatchEvent(new t.DataProviderRefreshEvent)})}))}),e.addEventListener(this._MUTATE,function(t){i._mutationEventQueue.push(t),i._setupMutationBusyContext(),i._isFetchingForMutation?i._mustRefetch=!0:(i._isFetchingForMutation=!0,i._currentResultsForMutation=i._currentResults,i._hasMutated=!0,i._mutationEventDataFetcher(function(t){i._isFetchingForMutation=!1,i._updateTotalSize().then(function(){i._mutatingTotalSize=null,0===t.results.length?(i._mutationFunc(!0),i.setPage(i._currentPage,{pageSize:i._pageSize})):(i._processMutationEventsByKey(t),i._mutationFunc(!0))})}))})},e}();return t.PagingDataProviderView=i,t.PagingDataProviderView=i,t.EventTargetMixin.applyMixin(i),i});