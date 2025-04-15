import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./admin/layout/layout.component";
import { OrderComponent } from "./admin/order/order.component";
import { CartsComponent } from "./carts/carts.component";
import { RegisterComponent } from "./register/register.component";
import { UserPageComponent } from "./user-page/user-page.component";
import { ProductAdminComponent } from "./admin/product-admin/product-admin.component";
import { HomeComponent } from "./main/home/home.component";
import { LogoutComponent } from "./logout/logout.component";
import { LoginComponent } from "./login/login.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { AdminGuard } from "./Guards/admin-auth.guard";
import { UserGuard } from "./Guards/user-auth.guard";
import { ProductComponent } from "./main/product/product.component";
import { ProfileComponent } from "./main/profile/profile.component";
import { AllUserComponent } from "./admin/all-user/all-user.component";
import { StarRatingComponent } from "./shared/star-rating/star-rating.component";



export const routes: Routes = [
  // Admin Routes (Protected)
  {
    path: "admin",
    component: LayoutComponent,
    canActivate: [],
    children: [
      { path: "products", component: ProductAdminComponent },
      { path: "orders", component: OrderComponent },
      {path:'pro' , component : ProfileComponent},
      {path:'alluser',component:AllUserComponent}
      // { path: "add-product", component: AddProductComponent }
    ]
  },

  // User Routes
  {
    path: "user",
    component: UserPageComponent,
    children: [
      { path: "home", component: HomeComponent , children:[
        { path: "logout", component: LogoutComponent }
      ]},
      { path: "carts", component: CartsComponent, canActivate: [UserGuard] },
      { path: "register", component: RegisterComponent },
      { path: "login", component: LoginComponent },
      { path: "star", component: StarRatingComponent },
      // { path: "logOut", component: LogoutComponent },
      // { path: "product/:id", component: ProductComponent } // 🆕 Add product details route
    ]
  },

  // Default Route
  { path: "", redirectTo: "user/home", pathMatch: "full" },

  // Catch-All Wildcard Route (404)
  { path: "**", component: NotfoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
