"use strict";(self.webpackChunkyokoy_movies_db=self.webpackChunkyokoy_movies_db||[]).push([[70],{2070:(I,d,n)=>{n.r(d),n.d(d,{ActorsModule:()=>F});var u=n(4755),c=n(9289),s=n(5030),l=n(4469),p=n(9064),t=n(9523),h=n(609),g=n(6821);function A(e,i){1&e&&(t.TgZ(0,"label"),t._uU(1," * Name is required "),t.qZA())}function v(e,i){if(1&e&&(t.TgZ(0,"div",5),t.YNc(1,A,2,0,"label",6),t.qZA()),2&e){const o=t.oxw();t.xp6(1),t.Q6J("ngIf",o.formGroup.controls.name.hasError("required"))}}let Z=(()=>{class e{constructor(o,r,a,m){this.data=o,this.actorsService=r,this.dialogRef=a,this.errorService=m,this.submitted=!1,this.formGroup=new s.cw({name:new s.NI(null,[s.kI.required])})}add(){this.submitted=!0,this.formGroup.invalid?this.formGroup.markAllAsTouched():this.actorsService.create(this.formGroup.value).subscribe(o=>{this.dialogRef.close()},o=>{this.errorService.handle({friendlyMessage:"Unable to create actor, please try again later!",message:o.message,priority:p.p.MAJOR})})}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(l.WI),t.Y36(h.A),t.Y36(l.so),t.Y36(g.q))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-actor-dialog"]],decls:9,vars:4,consts:[[1,"modal-content"],[3,"formGroup"],["type","text","formControlName","name"],[1,"submit",3,"click"],["class","text-error",4,"ngIf"],[1,"text-error"],[4,"ngIf"]],template:function(o,r){if(1&o&&(t.TgZ(0,"div",0)(1,"h2"),t._uU(2,"Add new actor"),t.qZA(),t.TgZ(3,"form",1),t._UZ(4,"input",2),t.TgZ(5,"button",3),t.NdJ("click",function(){return r.add()}),t._uU(6,"Add!"),t.qZA(),t.TgZ(7,"div"),t.YNc(8,v,2,1,"div",4),t.qZA()()()),2&o){let a;t.xp6(3),t.Q6J("formGroup",r.formGroup),t.xp6(1),t.ekj("error",r.submitted&&(null==(a=r.formGroup.get("name"))?null:a.errors)),t.xp6(4),t.Q6J("ngIf",r.formGroup.controls.name.invalid&&(r.formGroup.controls.name.dirty||r.formGroup.controls.name.touched))}},dependencies:[u.O5,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u]}),e})();const T={name:""};var C=n(8372),f=n(888);function b(e,i){if(1&e&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA()()),2&e){const o=i.$implicit;t.xp6(2),t.Oqu(o.id),t.xp6(2),t.Oqu(o.name)}}const y=[{path:"",component:(()=>{class e{constructor(o,r,a,m){this.actorsService=o,this.dialog=r,this.errorService=a,this.formBuilder=m,this.actors=[],this.pageIndex=1,this.filter=T,this.dialogWidth=f.Z.MODAL_WIDTH,this.debounceTime=f.Z.KEY_CHANGES_DELAY,this.filterForm=this.formBuilder.group({name:[this.filter.name]}),this._subscribeToControlKeyChanges("name")}ngOnInit(){this._getActors()}ngOnDestroy(){this.keyChangesSubscription&&this.keyChangesSubscription.unsubscribe()}add(){this.dialog.open(Z,{minWidth:this.dialogWidth}).afterClosed().subscribe(()=>{this._getActors()})}_subscribeToControlKeyChanges(o){this.keyChangesSubscription=this.filterForm.controls[o].valueChanges.pipe((0,C.b)(this.debounceTime)).subscribe(r=>{this.filter[o]=r,this._getActors()})}_getActors(){this.actorsService.getActors(this.pageIndex,this._getFilter()).subscribe(o=>{this.actors=o},o=>{this.errorService.handle({friendlyMessage:"Unable to get actors, please try again later!",message:o.message,priority:p.p.CRITICAL})})}_getFilter(){return{name:this.filterForm.controls.name.value}}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(h.A),t.Y36(l.uw),t.Y36(g.q),t.Y36(s.qu))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-actors"]],decls:24,vars:2,consts:[[1,"header"],["href","","routerLink","/actors","routerLinkActive","is-active"],["href","","routerLink","/movies","routerLinkActive","is-active"],[1,"filters",3,"formGroup"],[1,"search"],["for","search"],["type","text","formControlName","name","placeholder","Search"],[3,"click"],[4,"ngFor","ngForOf"]],template:function(o,r){1&o&&(t.TgZ(0,"div",0)(1,"a",1),t._uU(2,"Actors"),t.qZA(),t._uU(3," | "),t.TgZ(4,"a",2),t._uU(5,"Movies"),t.qZA()(),t.TgZ(6,"h3"),t._uU(7,"Yokoy actors"),t.qZA(),t.TgZ(8,"form",3)(9,"div",4)(10,"label",5),t._uU(11,"Search: "),t.qZA(),t._UZ(12,"input",6),t.qZA(),t.TgZ(13,"button",7),t.NdJ("click",function(){return r.add()}),t._uU(14,"Add"),t.qZA()(),t.TgZ(15,"table")(16,"thead")(17,"tr")(18,"td"),t._uU(19,"Id"),t.qZA(),t.TgZ(20,"td"),t._uU(21,"Name"),t.qZA()()(),t.TgZ(22,"tbody"),t.YNc(23,b,5,2,"tr",8),t.qZA()()),2&o&&(t.xp6(8),t.Q6J("formGroup",r.filterForm),t.xp6(15),t.Q6J("ngForOf",r.actors))},dependencies:[u.sg,c.rH,c.Od,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u]}),e})()}];let U=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[c.Bz.forChild(y),c.Bz]}),e})(),F=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[u.ez,U,s.u5,s.UX,l.Is]}),e})()}}]);