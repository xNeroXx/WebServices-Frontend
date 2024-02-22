import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch} from "@angular/common/http";
import {JwtInterceptor} from "./classes/JwtInterceptor";
import {LoginFormComponent} from './components/login-form/login-form.component';
import {MainPageComponent} from "./components/main-page/main-page.component";
import {DummyComponent} from "./components/dummy/dummy.component";
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import {MatFormField} from "@angular/material/form-field";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UploadComponent } from './components/upload/upload.component';
import {MatIcon} from "@angular/material/icon";
import { HeaderComponent } from './components/header/header.component';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton} from "@angular/material/button";
import { FooterComponent } from './components/footer/footer.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import {MatSlider} from "@angular/material/slider";

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    DummyComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AudioPlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginFormComponent,
    MatFormField,
    MatAutocomplete,
    MatOption,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    SearchComponent,
    MatIcon,
    UploadComponent,
    MatToolbar,
    MatButton,
    FormsModule,
    MatSlider,
    MatIconButton
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
