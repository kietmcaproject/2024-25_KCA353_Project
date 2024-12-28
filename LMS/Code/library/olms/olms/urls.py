"""
URL configuration for olms project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import ping_session

from .import views,adminviews,stuviews
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ping-session/', ping_session, name='ping_session'),
    path('base/', views.BASE, name='base'),
    path('Dashboard', views.DASHBOARD, name='dashboard'),
    path('Login', views.LOGIN, name='login'),
    path('doLogin', views.doLogin, name='doLogin'),
    path('', views.Index, name='index'),
    path('doLogout', views.doLogout, name='logout'),
    path('AdminProfile', views.ADMIN_PROFILE, name='admin_profile'),
    path('AdminProfile/update', views.ADMIN_PROFILE_UPDATE, name='admin_profile_update'),
    path('Password', views.CHANGE_PASSWORD, name='change_password'),
    path('Admin/AddCategory', adminviews.ADD_CATEGORY, name='add_category'),
    path('Admin/ManageCategory', adminviews.MANAGE_CATEGORY, name='manage_category'),
    path('Admin/DeleteCategory/<str:id>', adminviews.DELETE_CATEGORY, name='delete_category'),
    path('UpdateCategory/<str:id>', adminviews.UPDATE_CATEGORY, name='update_category'),
    path('UpdateCategoryDetails', adminviews.UPDATE_CATEGORY_DETAILS, name='update_category_details'),
    path('Admin/AddAuthor', adminviews.ADD_AUTHOR, name='add_author'),
    path('Admin/ManageAuthor', adminviews.MANAGE_AUTHOR, name='manage_author'),
    path('Admin/DeleteAuthor/<str:id>', adminviews.DELETE_AUTHOR, name='delete_author'),
    path('UpdateAuthor/<str:id>', adminviews.UPDATE_AUTHOR, name='update_author'),
    path('UpdateAuthorDetails', adminviews.UPDATE_AUTHOR_DETAILS, name='update_author_details'),
    path('Admin/AddBooks', adminviews.ADD_BOOKS, name='add_books'),
    path('Admin/ManageBooks', adminviews.MANAGE_BOOKS, name='manage_books'),
    path('Admin/DeleteBooks/<str:id>', adminviews.DELETE_BOOKS, name='delete_books'),
    path('UpdateBooks/<str:id>', adminviews.UPDATE_BOOKS, name='update_books'),
    path('UpdateBooksDetails', adminviews.UPDATE_BOOKS_DETAILS, name='update_books_details'),
    path('Admin/IssueBook', adminviews.ISSUE_BOOK, name='issue_book'),
    path('Admin/ManageIssuedBooks', adminviews.MANAGE_ISSUEDBOOKS, name='manage_issued_books'),
    path('UpdateIBStatus/<str:id>', adminviews.UPDATE_IBSTATUS, name='update_ib_status'),
    path('Admin/UpdateIBstatusdetails', adminviews.UPDATE_IBSTATUS_DETAILS, name='update_ibstattus_details'),
    path('Admin/ManageRegUsers', adminviews.MANAGE_REGUSERS, name='manage_regusers'),
    path('Admin/DeleteRegUsers/<str:id>', adminviews.DELETE_REGUSERS, name='delete_regusers'),
    path('Admin/Studenlibhistory/<str:id>', adminviews.STUDENT_LIB_HISTORY, name='student_lib_history'),
    path('Admin/SearchBook', adminviews.SEARCHBOOK, name='search_books'),
    path('Admin/SearchRegusers', adminviews.SEARCHREGUSERS, name='search_regusers'),
    path('Student/IssuedBooks', stuviews.ISSUEDBOOKS, name='issued_books'),
    path('Student/BooksDetails', stuviews.BOOKSDETAILS, name='books_details'),


    path('Student/StuReg', stuviews.STUDENT_REG, name='signup'),
]+static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
