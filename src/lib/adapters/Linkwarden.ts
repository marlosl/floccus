import { Capacitor, CapacitorHttp as Http } from '@capacitor/core'
import Adapter from '../interfaces/Adapter'
import HtmlSerializer from '../serializers/Html'
import Logger from '../Logger'
import { Bookmark, Folder, ItemLocation, TItem, TItemLocation } from '../Tree'
import { IAccountData } from '../interfaces/AccountStorage'
import Ordering from '../interfaces/Ordering'


class Linkwarden implements Adapter {
  private lockingInterval: any
  private locked: boolean
  private ended: boolean
  protected server: any
  
  constructor(server: any) {
    this.server = server
    this.locked = false
    this.ended = true
    this.lockingInterval = null
  }

  setData(data:any):void {
    this.server = { ...data }
  }

  getData():any {
    return { ...this.server }
  }

  cancel(): void {
    // noop
  }

  getLabel(): string {
    const data = this.getData()
    return data.label || (data.username.includes('@') ? data.username + ' on ' + new URL(data.url).hostname : data.username + '@' + new URL(data.url).hostname)
  }

  acceptsBookmark(bm:Bookmark<TItemLocation>):boolean {
    if (bm.url === 'data:') {
      return false
    }
    try {
      return Boolean(['https:', 'http:', 'ftp:', 'data:', 'javascript:', 'chrome:', 'file:'].includes(
        new URL(bm.url).protocol
      ))
    } catch (e) {
      return false
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  async onSyncStart(needLock = true):Promise<void|boolean> { }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async onSyncFail():Promise<void> { }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async onSyncComplete():Promise<void> { }

  async getBookmarksTree(): Promise<Folder<TItemLocation>> {
    Logger.log('getBookmarksTree')
    return null;
  }

  async createBookmark(bm:Bookmark<TItemLocation>):Promise<string|number> {
    Logger.log('CREATE', bm);
    return null;
  }

  async updateBookmark(newBm: Bookmark<TItemLocation>): Promise<void> {
    Logger.log('UPDATE', newBm);
    return null;
  }

  async removeBookmark(bookmark:Bookmark<TItemLocation>): Promise<void> {
    Logger.log('REMOVE', { bookmark });
    return null;
  }

  async createFolder(folder:Folder<TItemLocation>): Promise<string|number> {
    Logger.log('CREATEFOLDER', { folder });
    return null;
  }

  async updateFolder(folder:Folder<TItemLocation>): Promise<void> {
    Logger.log('UPDATEFOLDER', { folder });
    return null;
  }

  async orderFolder(id:string|number, order:Ordering<TItemLocation>):Promise<void> {
    Logger.log('ORDERFOLDER', { id, order });
  }

  async removeFolder(folder:Folder<TItemLocation>):Promise<void> {
    Logger.log('REMOVEFOLDER', { folder });
  }


  async bulkImportFolder(id:string|number, folder:Folder<TItemLocation>):Promise<Folder<TItemLocation>> {
    Logger.log('BULKIMPORT', { id, folder });
    return null;
  }

  isAvailable(): Promise<boolean> {
    return Promise.resolve(true)
  }  
}
