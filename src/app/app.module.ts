import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {LoginFormComponent} from './components/login-form/login-form.component';
import {MainPageComponent} from "./components/main-page/main-page.component";
import {DummyComponent} from "./components/dummy/dummy.component";
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
import {AudioPlayerComponent} from './components/audio-player/audio-player.component';
import {MatSlider} from "@angular/material/slider";
import {SignupComponent} from './components/signup/signup.component';
import {SearchResultsComponent} from './components/search-results/search-results.component';
import {MatDivider} from "@angular/material/divider";
import {MatInput} from "@angular/material/input";
import {MatChipListbox, MatChipOption} from "@angular/material/chips";
import {PreSearchComponent} from './components/pre-search/pre-search.component';
import {MatListSubheaderCssMatStyler} from "@angular/material/list";
import { MusicComponent } from './components/music/music.component';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import { SongCardComponent } from './components/song-card/song-card.component';
import { FileConverterComponent } from './components/file-converter/file-converter.component';
import {MatProgressBar} from "@angular/material/progress-bar";
import {NgOptimizedImage} from "@angular/common";
import {authHeaderInterceptor} from "./classes/auth-header.interceptor";
import { MetadataEditComponent } from './components/metadata-edit/metadata-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelect} from "@angular/material/select";
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    DummyComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AudioPlayerComponent,
    SearchResultsComponent,
    PreSearchComponent,
    MusicComponent,
    SongCardComponent,
    FileConverterComponent,
    MetadataEditComponent,
    UploadComponent,
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
      MatGridList,
      MatGridTile,
      MatFabButton,
      MatProgressBar,
      NgOptimizedImage,
      MatInput,
      MatFormFieldModule,
      MatSelect,
      MatDialogContent,
      MatDialogTitle,
      MatDialogActions,
      MatDialogModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([authHeaderInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
