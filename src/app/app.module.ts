import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {LoginFormComponent} from './components/login-form/login-form.component';
import {MainPageComponent} from "./components/main-page/main-page.component";
import {HomeComponent} from './components/home/home.component';
import {SearchComponent} from './components/search/search.component';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UploadComponent} from './components/upload/upload.component';
import {MatIcon} from "@angular/material/icon";
import {HeaderComponent} from './components/header/header.component';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {FooterComponent} from './components/footer/footer.component';
import {MatSlider} from "@angular/material/slider";
import {SignupComponent} from './components/signup/signup.component';
import {SearchResultsComponent} from './components/search-results/search-results.component';
import {MatDivider} from "@angular/material/divider";
import {MatInput} from "@angular/material/input";
import {MatChipListbox, MatChipOption} from "@angular/material/chips";
import {PreSearchComponent} from './components/pre-search/pre-search.component';
import {MatListSubheaderCssMatStyler} from "@angular/material/list";
import { SongCardComponent } from './components/song-card/song-card.component';
import { FileConverterComponent } from './components/file-converter/file-converter.component';
import {authHeaderInterceptor} from "./classes/auth-header.interceptor";
import { MetadataEditComponent } from './components/metadata-edit/metadata-edit.component';
import {MatSelect} from "@angular/material/select";
import {MusicComponent} from "./components/music/music.component";
import {NgOptimizedImage} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatTooltip} from "@angular/material/tooltip";
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    MainPageComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SearchResultsComponent,
    PreSearchComponent,
    MusicComponent,
    SongCardComponent,
    MetadataEditComponent,
    FileConverterComponent,
    UploadComponent,
    LoadingScreenComponent,
    MetadataEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginFormComponent,
    SignupComponent,
    MatFormField,
    MatAutocomplete,
    MatOption,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    SearchComponent,
    MatIcon,
    MatToolbar,
    MatButton,
    FormsModule,
    MatSlider,
    MatIconButton,
    MatDivider,
    MatInput,
    MatLabel,
    MatChipListbox,
    MatChipOption,
    MatListSubheaderCssMatStyler,
    MatSelect,
    NgOptimizedImage,
    MatProgressSpinner,
    MatFabButton,
    MatTooltip,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([authHeaderInterceptor])),
  ],
  exports: [
    SongCardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
