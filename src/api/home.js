import index from './index'

// 获取笔记名称列表
export function getNote() {
    return index.get('/blog/note/')
}

// 同步笔记列表
export function postNoteList() {
    return index.post('/blog/syncNoteList/')
}

// 同步笔记内容
export function postNoteContent(params) {
    return index.post('/blog/syncNoteContent/', params)
}
// 获取七牛图片上传token
export function getQiNiuToken() {
    return index.get('/public/qiniuToken/')
}